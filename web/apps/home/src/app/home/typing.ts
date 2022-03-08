import { randomInt, wait } from '@awdware/shared';
import { BehaviorSubject } from 'rxjs';

export type TypingOptions = {
  minDelay: number;
  maxDelay: number;
  minEraseDelay: number;
  maxEraseDelay: number;
  initialDelay: number;
  errorRate: number;
};

type Locale = 'en' | 'de';
type Keyboard = {
  [Key in Locale]: {
    lower: string[];
    upper: string[];
  };
};

const keyboards: Keyboard = {
  en: {
    lower: ['1234567890-=', 'qwertyuiop[]', 'asdfghjkl;', 'zxcvbnm,./', ' '],
    upper: ['!@#$%^&*()_+', 'QWERTYUIOP{}|', 'ASDFGHJKL:"', 'ZXCVBNM?', ' ']
  },
  de: {
    lower: ['1234567890ß', 'qwertzuiopü+', 'asdfghjklöä#', 'yxcvbnm,.-', ' '],
    upper: ['!"§$%&/()=?', 'QWERTZUIOPÜ*', "ASDFGHJKLÖÄ'", 'YXCVBNM;:_', ' ']
  }
};

// const usedLocale = navigator.language === 'de' ? 'de' : 'en';
const usedLocale = 'de';

export class Typing {
  private _options: Partial<TypingOptions>;
  private _overrideOptions?: Partial<TypingOptions>;
  private _isRunning = false;
  private _letters: string[] = [];
  private _errorCount = 0;
  private _lettersSinceError = 0;
  private _lastErrorDelta: { r: number; c: number } = { r: 0, c: 0 };
  private _currentClassName: string | undefined = undefined;

  private readonly _text = new BehaviorSubject<string>('');
  public readonly text$ = this._text.asObservable();

  constructor(options: Partial<TypingOptions> = {}) {
    this._options = options;
  }

  private get options(): TypingOptions {
    return {
      ...{
        minDelay: 40,
        maxDelay: 150,
        minEraseDelay: 150,
        maxEraseDelay: 250,
        initialDelay: 0,
        errorRate: 0.1
      },
      ...this._options,
      ...(this._overrideOptions ?? {})
    };
  }

  public async start(sentance: string, options: Partial<TypingOptions> = {}, className?: string): Promise<void> {
    if (this._isRunning) {
      throw new Error('Typing is already running');
    }
    this._isRunning = true;
    this._overrideOptions = options;
    if (className !== this._currentClassName) {
      this._currentClassName = className;
      if (className) {
        const oldValue = this._text.value;
        this._text.next(oldValue + `<span class="${className}"></span>`);
      }
    }
    this._letters = sentance.split('');
    await wait(this.options.initialDelay);
    await wait(randomInt(this.options.minDelay, this.options.maxDelay));
    await this.nextLetter();
    this._isRunning = false;
  }

  private letterCanError(letter: string): boolean {
    return !(letter === ' ' || letter === '\n');
  }

  private async nextLetter(): Promise<void> {
    let letter = '';

    let probabilityForError = this.options.errorRate;
    probabilityForError += (this._lettersSinceError - 10) * 0.01;
    if (this._errorCount === 1 && this._lettersSinceError === 0) {
      probabilityForError += 0.3;
    }

    const isError = Math.random() < probabilityForError && this.letterCanError(this._letters[0]);
    if (isError) {
      letter = this.randomCharNear(this._letters[this._errorCount], usedLocale);
      this._lettersSinceError = -1;
      this._errorCount++;
    } else {
      if (this._errorCount === 0) {
        letter = this._letters.shift() ?? '';
        if (!letter) {
          return;
        }
      }
    }
    if (!isError && this._errorCount > 0) {
      this.doSingleBackspace();
      this._errorCount--;
      this._lettersSinceError = 1;
      await wait(randomInt(this.options.minEraseDelay, this.options.maxEraseDelay));
    } else {
      this.addLetter(letter);
      this._lettersSinceError++;
      await wait(randomInt(this.options.minDelay, this.options.maxDelay));
    }
    return this.nextLetter();
  }

  private addLetter(letter: string): void {
    const oldValue = this._text.value;
    if (this._currentClassName) {
      const insertIndex = oldValue.lastIndexOf('</span>');
      const oldValuePrefix = oldValue.substring(0, insertIndex);
      const oldValueSuffix = oldValue.substring(insertIndex);
      this._text.next(oldValuePrefix + letter + oldValueSuffix);
    } else {
      this._text.next(oldValue + letter);
    }
  }

  private doSingleBackspace(): void {
    const oldValue = this._text.value;
    if (this._currentClassName) {
      const insertIndex = oldValue.lastIndexOf('</span>');
      const oldValuePrefix = oldValue.substring(0, insertIndex);
      const oldValueSuffix = oldValue.substring(insertIndex);
      this._text.next(oldValuePrefix.substring(0, oldValuePrefix.length - 1) + oldValueSuffix);
    } else {
      this._text.next(oldValue.substring(0, oldValue.length - 1));
    }
  }

  public async backspace(count: number, options: Partial<TypingOptions> = {}): Promise<void> {
    if (this._isRunning) {
      throw new Error('Typing is already running');
    }
    this._isRunning = true;
    this._overrideOptions = options;
    const oldValue = this._text.value;
    if (oldValue.length < count) {
      throw new Error('Cannot backspace more than the current text length');
    }
    for (let i = 0; i < count; i++) {
      await wait(randomInt(this.options.minEraseDelay, this.options.maxEraseDelay));
      this.doSingleBackspace();
    }
    this._isRunning = false;
  }

  private randomCharNear(ch: string, locale: Locale): string {
    const threshold = 2;
    const keyboard = keyboards[locale];
    let isLower = true;
    let rowIndex = keyboard.lower.findIndex(row => row.includes(ch));
    if (rowIndex === -1) {
      isLower = false;
      rowIndex = keyboard.upper.findIndex(row => row.includes(ch));
    }
    if (rowIndex === -1) {
      return this.randomChar(locale, isLower);
    }
    const usedKeyboard = isLower ? keyboard.lower : keyboard.upper;
    const columnIndex = usedKeyboard[rowIndex].indexOf(ch);
    const nearbyChars = [];

    if (this._errorCount > 0) {
      const { r, c } = this._lastErrorDelta;
      const row = rowIndex + r;
      const column = columnIndex + c;
      if (row >= 0 && row < usedKeyboard.length && column >= 0 && column < usedKeyboard[row].length) {
        return usedKeyboard[row][column];
      }
    }

    for (let r = -1; r <= 1; r++) {
      for (let c = -2; c <= 2; c++) {
        const row = rowIndex + r;
        const column = columnIndex + c;

        if ((r === 0 && c === 0) || Math.abs(r) + Math.abs(c) > threshold) {
          // skip same char and too far away
          continue;
        }
        if (row === 0 && rowIndex !== 0) {
          // We do not want to accidentally switch to the number row, because that is unlikely I think
          continue;
        }
        if (row >= 0 && row < usedKeyboard.length && column >= 0 && column < usedKeyboard[row].length) {
          nearbyChars.push({ r, c, char: usedKeyboard[row][column] });
        }
      }
    }
    const randomChar = nearbyChars[randomInt(0, nearbyChars.length - 1)];
    this._lastErrorDelta = { r: randomChar.r, c: randomChar.c };
    return randomChar.char;
  }

  private randomChar(locale: Locale, lower: boolean) {
    const keyboard = keyboards[locale];
    const usedKeyboard = lower ? keyboard.lower : keyboard.upper;
    const chars = usedKeyboard.join('');
    return chars.charAt(randomInt(0, chars.length - 1));
  }
}

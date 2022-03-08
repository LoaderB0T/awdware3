import { randomInt, wait } from '@awdware/shared';
import { BehaviorSubject } from 'rxjs';

export type TypingOptions = {
  minDelay?: number;
  maxDelay?: number;
  minEraseDelay?: number;
  maxEraseDelay?: number;
  delay?: number;
  errorRate?: number;
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
    upper: ['!@#$%^&*()_+', 'QWERTYUIOP{}|', 'ASDFGHJKL:"', 'ZXCVBNM<>?', ' ']
  },
  de: {
    lower: ['1234567890ß', 'qwertzuiopü+', 'asdfghjklöä#', '<yxcvbnm,.->', ' '],
    upper: ['!"§$%&/()=?', 'QWERTZUIOPÜ*', "ASDFGHJKLÖÄ'", '>YXCVBNM;:_', ' ']
  }
};

// const usedLocale = navigator.language === 'de' ? 'de' : 'en';
const usedLocale = 'de';

export class Typing {
  private _minDelay: number;
  private _maxDelay: number;
  private _minEraseDelay: number;
  private _maxEraseDelay: number;
  private _delay: number;
  private _errorRate: number;
  private _letters: string[] = [];
  private _errorCount = 0;
  private _lettersSinceError = 0;
  private _lastErrorDelta: { r: number; c: number } = { r: 0, c: 0 };

  private readonly _text = new BehaviorSubject<string>('');
  public readonly text$ = this._text.asObservable();

  constructor(options: TypingOptions = {}) {
    this._minDelay = options.minDelay || 40;
    this._maxDelay = options.maxDelay || 150;
    this._minEraseDelay = options.minEraseDelay ?? this._minDelay ?? 150;
    this._maxEraseDelay = options.maxEraseDelay ?? this._maxDelay ?? 250;
    this._delay = options.delay || 0;
    this._errorRate = options.errorRate || 0.1;
  }

  public async start(sentance: string): Promise<void> {
    this._letters = sentance.split('');
    await wait(this._delay);
    await this.nextLetter();
  }

  private async nextLetter(): Promise<void> {
    let letter = '';

    let probabilityForError = this._errorRate;
    probabilityForError += (this._lettersSinceError - 5) * 0.05;
    if (this._errorCount === 1 && this._lettersSinceError === 0) {
      probabilityForError += 2.7;
    }

    const isError = Math.random() < probabilityForError;
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
      this.backspace();
      this._errorCount--;
      this._lettersSinceError++;
      await wait(randomInt(this._minEraseDelay, this._maxEraseDelay));
    } else {
      this.addLetter(letter);
      this._lettersSinceError++;
      await wait(randomInt(this._minDelay, this._maxDelay));
    }
    return this.nextLetter();
  }

  private addLetter(letter: string): void {
    const oldValue = this._text.value;
    this._text.next(oldValue + letter);
  }

  private backspace(): void {
    const oldValue = this._text.value;
    this._text.next(oldValue.substring(0, oldValue.length - 1));
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

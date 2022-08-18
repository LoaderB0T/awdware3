import type { ExecutorContext } from '@nrwl/devkit';
import { exec } from 'child_process';
import { copyFileSync, readFileSync } from 'fs';
import * as fse from 'fs-extra';

export interface NgDynamicMfExecutorOptions {
  modulesFolder: string;
  m?: string;
  modules?: string;
}

export default async function echoExecutor(
  options: NgDynamicMfExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  console.info(`Executing "echo"...`);

  const callerName = context.projectName!;
  const projConfig = context.workspace.projects[callerName];
  const projRoot = projConfig.root;

  const modulesJsonName = `modules.${options.m ?? options.modules ?? 'default'}.json`;
  copyFileSync(`${projRoot}/${options.modulesFolder}/${modulesJsonName}`, `${projRoot}/${options.modulesFolder}/modules.json`);

  const modulesFilePath = `${projRoot}/${options.modulesFolder}/modules.json`;
  const modulesFile = readFileSync(modulesFilePath, 'utf8');
  const modulesToLoad = JSON.parse(modulesFile) as { name: string; url: string }[];

  const servings: Promise<void>[] = [];
  const builds: Promise<void>[] = [];

  modulesToLoad.forEach(moduleToLoad => {
    const moduleConfig = context.workspace.projects[moduleToLoad.name];
    if (moduleToLoad.url.startsWith('http://') || moduleToLoad.url.startsWith('https://')) {
      if (!moduleToLoad.url.startsWith('http://localhost') || moduleToLoad.url.startsWith('https://localhost')) {
        // Skipping because external URL
        return;
      }
      const port = /localhost:(\d+)/.exec(moduleToLoad.url)![1];
      if (!port || Number.isNaN(Number.parseInt(port))) {
        throw new Error(`Invalid port in module ${moduleToLoad.name}`);
      }
      const portNumber = Number.parseInt(port);
      console.log(`Serving ${moduleToLoad.name} on port ${portNumber}`);
      servings.push(
        new Promise<void>((resolve, reject) => {
          const child = exec(`nx serve ${moduleToLoad.name} --port ${portNumber}`);
          child.stdout!.pipe(process.stdout);
          child.on('exit', code => (code === 0 ? resolve() : reject(code)));
        })
      );
    } else {
      console.log(`Building ${moduleToLoad.name} to ${moduleToLoad.url}`);
      builds.push(
        new Promise<void>((resolve, reject) => {
          const child = exec(`nx build ${moduleToLoad.name}`);
          child.stdout!.pipe(process.stdout);
          child.on('exit', code => (code === 0 ? resolve() : reject(code)));
        }).then(() => {
          fse.copySync(`./dist/${moduleConfig.root}`, `${projConfig.sourceRoot}${moduleToLoad.url}`);
        })
      );
    }
  });

  servings.push(
    new Promise<void>((resolve, reject) => {
      const child = exec(`nx serve ${callerName} --open`);
      child.stdout!.pipe(process.stdout);
      child.on('exit', code => (code === 0 ? resolve() : reject(code)));
    })
  );

  try {
    await Promise.all(builds);
    await Promise.all(servings);
  } catch (error) {
    console.error(`Error building referenced projects.`);
    console.error(error);
    return { success: false };
  }

  return { success: true };
}

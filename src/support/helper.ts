import { execSync } from 'child_process';
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs';

import { cwd } from 'process';
const DEFAULT_CWD = cwd();

const GENERATE_CUCUMBER_HTML_REPORT =
  process.env.GENERATE_HTML_REPORT !== 'true';
const METADATA_FILE =
  process.env.METADATA_FILE || `${DEFAULT_CWD}/reports/metadata.json`;


//Logger
import { Logger } from 'log4js';
var log4js = require("log4js");
var log4jsConfig = require('../utils/Logger/Logger');
var logger = log4js.getLogger();

/**
 * The purpose of this temporary test-file is to capture TestCafes' TestController.
 * We basically create and run a dummy test and capture the TestController for future tests.
 */

//Test controller of testcafe needs a test file and hence dummy file is created.
export const createTestFile = (name: string, testcontent: string) => {
  writeFileSync(
    name,
    testcontent
  );
};

/**
 * Generates the HTML report if {@link GENERATE_CUCUMBER_HTML_REPORT} is `true`
 */
export const generateHtmlReport = (): void => {
  if (GENERATE_CUCUMBER_HTML_REPORT) {
    try {
      logger.info('Generating HTML report...');
      execSync(`node "${process.cwd()}"/cucumber-html.config.ts`);
    } catch (error) {
      logger.error('Could not generate cucumber html report', error);
    }
  }
};

// Creates the temporary shared metadata file. Its content gets displayed in the HTML report.
export const createMetadataFile = (): void => {
  if (!existsSync(METADATA_FILE)) {
    logger.info('Writing metadata file...');
    writeFileSync(METADATA_FILE, '{}');
  }
};

// Deletes the temporary shared metadata file.
 export const removeMetadataFile = (): void => {
  if (existsSync(METADATA_FILE)) {
    logger.info('Removing metadata file...');
    unlinkSync(METADATA_FILE);
  }
};

export const addMetadata = (key: string, value: string): void => {
  const rawData = readFileSync(METADATA_FILE, 'utf-8');
  const json = JSON.parse(rawData);
  json[key] = value;
  writeFileSync('reports/metadata.json', JSON.stringify(json));
};

export const getRandomString = (length: Number) => {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = "";
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

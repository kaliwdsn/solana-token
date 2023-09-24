"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var web3_js_1 = require("@solana/web3.js");
// import { DataV2 } from '@metaplex-foundation/mpl-token-metadata';
// import { bundlrStorage, keypairIdentity, Metaplex, UploadMetadataInput } from '@metaplex-foundation/js';
var bip39 = require("bip39");
// const bip39 = require('bip39');
require("dotenv/config");
require('dotenv').config();
var secret = JSON.parse((_a = process.env.PRIVATE_KEY2) !== null && _a !== void 0 ? _a : "");
console.log('secret:', secret);
var secretKey = Uint8Array.from(secret);
// / 将 Solana 字节数组转换为 Uint8Array
var uint8Array = new Uint8Array(secret);
console.log('secretKey:', secretKey);
var payer = web3_js_1.Keypair.fromSecretKey(uint8Array);
console.log('payer:', payer);
// 将 Uint8Array 转换为 Buffer
var buffer = Buffer.from(secretKey);
console.log('payer:', buffer.toString('hex'));
// // 将 Buffer 转换为助记词
var mnemonic = bip39.entropyToMnemonic(buffer.toString('hex'));
console.log('Mnemonic:', mnemonic);

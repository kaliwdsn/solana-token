import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { createMint, getMint, TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount, getAccount, mintTo, AccountLayout } from '@solana/spl-token';
import * as bs58 from 'bs58';
import 'dotenv/config';
require('dotenv').config()
const secret = JSON.parse(process.env.PRIVATE_KEY2 ?? "") as number[]
console.log('secret:', secret);
//**把字节私钥转化成字符串**/
//将 Solana 字节数组转换为 Uint8Array
const uint8Array = new Uint8Array(secret);
//转化出来私钥可以导入到phantom钱包
console.log("私钥", bs58.encode(uint8Array));


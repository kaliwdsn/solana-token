import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, Transaction } from '@solana/web3.js';
import { createMint, getMint, TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount, getAccount, mintTo, AccountLayout, createTransferInstruction } from '@solana/spl-token';
// import { DataV2 } from '@metaplex-foundation/mpl-token-metadata';
// import { bundlrStorage, keypairIdentity, Metaplex, UploadMetadataInput } from '@metaplex-foundation/js';

import 'dotenv/config';
require('dotenv').config()
const secret = JSON.parse(process.env.PRIVATE_KEY2 ?? "") as number[]
const secretKey = Uint8Array.from(secret)
// const keypairFromSecretKey = Keypair.fromSecretKey(secretKey)
const payer = Keypair.fromSecretKey(secretKey)


console.log("process.env", payer.publicKey)

// const payer = Keypair.generate();
// console.log("payer",payer,payer.publicKey)

const connection = new Connection(
    clusterApiUrl('devnet'),
    'confirmed'
);

async function transfer() {
    const tokenAddress = "33hnrSWmU9wiRk3s75PbR7sZ9Lg8Vy4x1iCqSYmfEeyH"
    const mint = new PublicKey(tokenAddress);
    const toToken = new PublicKey("BFMr5okcLdcg38Hy7qSiRPqnCmR2H5f2J6JFkRRKVfEj");
    const fromToken = new PublicKey("96NqqSswtcX6gtGdKXe3HAA1kgykYLiHNXmSiszu9dwq");

    //产生关联地址
    // const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    //     connection,
    //     payer,
    //     mint,
    //     payer.publicKey
    // );

    const fromtokenAccountAddress = "96NqqSswtcX6gtGdKXe3HAA1kgykYLiHNXmSiszu9dwq"


    //产生关联地址
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        toToken
    );

    const toTokenguan = new PublicKey("7ocSb3f5jKSSjp1VDBRNZspT6aVH48vecnig1JQ8o5sU");


    console.log(toTokenAccount.address.toBase58());

    console.log(toTokenAccount.address.toBase58());

    await mintTo(
        connection,
        payer,
        mint,
        toTokenguan,
        payer,
        100000000000000000 // because decimals for the mint are set to 9 
    )

    // Add token transfer instructions to transaction
    // const transaction = new Transaction().add(
    //     createTransferInstruction(
    //         TOKEN_PROGRAM_ID,
    //         fromToken,
    //         toTokenAccount.address,
    //         payer,
    //         [],
    //         1
    //     )
    // );

    // // Sign transaction, broadcast, and confirm
    // await sendAndConfirmTransaction(connection, transaction, [payer]);

}
transfer()
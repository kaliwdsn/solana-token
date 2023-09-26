import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { createMint, getMint, TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount, getAccount, mintTo, AccountLayout } from '@solana/spl-token';

import 'dotenv/config';
require('dotenv').config()
const secret = JSON.parse(process.env.PRIVATE_KEY2 ?? "") as number[]
const secretKey = Uint8Array.from(secret)
const payer = Keypair.fromSecretKey(secretKey)


console.log("process.env", payer.publicKey)

// const payer = Keypair.generate();
// console.log("payer",payer,payer.publicKey)

const connection = new Connection(
  clusterApiUrl('devnet'),
  'confirmed'
);

//空投gas sol
async function airdrop() {
  try {
    const airdropSignature = await connection.requestAirdrop(
      // payer.publicKey,
      new PublicKey("6ciq34LobTP9LUQAsaJcFYhjgayZvbwCr2NuPRV9zL7x"),


      2 * LAMPORTS_PER_SOL,
    );
    const latestBlockHash = await connection.getLatestBlockhash();

    // await connection.confirmTransaction(airdropSignature);
    // await connection.confirmTransaction(signature, 'confirmed');

    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: airdropSignature,
    });
  } catch (error) {
    console.error("Airdrop failed:", error);

  }
}

async function create() {
  //创建token
  // const mint = await createMint(
  //   connection,
  //   payer,
  //   payer.publicKey,
  //   payer.publicKey,
  //   9 // We are using 9 to match the CLI decimal default exactly
  // );

  // console.log(mint.toBase58());

  //加载mint账号合约
  const tokenAddress = "33hnrSWmU9wiRk3s75PbR7sZ9Lg8Vy4x1iCqSYmfEeyH"
  const mint = new PublicKey(tokenAddress);
  // const token = new Token(connection, mint, splToken.TOKEN_PROGRAM_ID);
  // const tokenPublicKey = token.publicKey;
  const mintInfo = await getMint(
    connection,
    mint
  )

  console.log(mintInfo.supply);



  //产生关联地址
  // const tokenAccount = await getOrCreateAssociatedTokenAccount(
  //   connection,
  //   payer,
  //   mint,
  //   payer.publicKey
  // )

  // console.log(tokenAccount.address.toBase58());

  //6ciq34LobTP9LUQAsaJcFYhjgayZvbwCr2NuPRV9zL7x 钱包地址
  //96NqqSswtcX6gtGdKXe3HAA1kgykYLiHNXmSiszu9dwq 关联地址
  const tokenAccountAddress = "96NqqSswtcX6gtGdKXe3HAA1kgykYLiHNXmSiszu9dwq"
  const tokenAccount2 = new PublicKey(tokenAccountAddress);

  //查询余额
  const tokenAccountInfo = await getAccount(
    connection,
    tokenAccount2
  )

  console.log("余额", tokenAccountInfo.amount);

  //minto地址 mint数量
  await mintTo(
    connection,
    payer,
    mint,
    tokenAccount2,
    payer,
    100000000000 // because decimals for the mint are set to 9 
  )

  //查询token概述
  const tokenAccounts = await connection.getTokenAccountsByOwner(
    new PublicKey('6ciq34LobTP9LUQAsaJcFYhjgayZvbwCr2NuPRV9zL7x'),
    {
      programId: TOKEN_PROGRAM_ID,
    }
  );

  console.log("Token                                         Balance");
  console.log("------------------------------------------------------------");
  tokenAccounts.value.forEach((tokenAccount) => {
    const accountData = AccountLayout.decode(tokenAccount.account.data);
    console.log(`${new PublicKey(accountData.mint)}   ${accountData.amount}`);
  })
}
//https://explorer.solana.com/
//airdrop()
airdrop().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// create()
// create().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

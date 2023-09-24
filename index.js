"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var web3_js_1 = require("@solana/web3.js");
var spl_token_1 = require("@solana/spl-token");
// import { DataV2 } from '@metaplex-foundation/mpl-token-metadata';
// import { bundlrStorage, keypairIdentity, Metaplex, UploadMetadataInput } from '@metaplex-foundation/js';
require("dotenv/config");
require('dotenv').config();
var secret = JSON.parse((_a = process.env.PRIVATE_KEY2) !== null && _a !== void 0 ? _a : "");
var secretKey = Uint8Array.from(secret);
// const keypairFromSecretKey = Keypair.fromSecretKey(secretKey)
var payer = web3_js_1.Keypair.fromSecretKey(secretKey);
console.log("process.env", payer.publicKey);
// const payer = Keypair.generate();
// console.log("payer",payer,payer.publicKey)
var connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('devnet'), 'confirmed');
//空投gas sol
function airdrop() {
    return __awaiter(this, void 0, void 0, function () {
        var airdropSignature, latestBlockHash, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, connection.requestAirdrop(
                        // payer.publicKey,
                        new web3_js_1.PublicKey("HxJHFKt8nFxmXL8HVnD84YJFrsZmHC1ux9fgwm2awkS8"), 2 * web3_js_1.LAMPORTS_PER_SOL)];
                case 1:
                    airdropSignature = _a.sent();
                    return [4 /*yield*/, connection.getLatestBlockhash()];
                case 2:
                    latestBlockHash = _a.sent();
                    // await connection.confirmTransaction(airdropSignature);
                    // await connection.confirmTransaction(signature, 'confirmed');
                    return [4 /*yield*/, connection.confirmTransaction({
                            blockhash: latestBlockHash.blockhash,
                            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                            signature: airdropSignature,
                        })];
                case 3:
                    // await connection.confirmTransaction(airdropSignature);
                    // await connection.confirmTransaction(signature, 'confirmed');
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Airdrop failed:", error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function create() {
    return __awaiter(this, void 0, void 0, function () {
        var tokenAddress, mint, mintInfo, tokenAccountAddress, tokenAccount2, tokenAccountInfo, tokenAccounts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tokenAddress = "33hnrSWmU9wiRk3s75PbR7sZ9Lg8Vy4x1iCqSYmfEeyH";
                    mint = new web3_js_1.PublicKey(tokenAddress);
                    return [4 /*yield*/, (0, spl_token_1.getMint)(connection, mint)];
                case 1:
                    mintInfo = _a.sent();
                    console.log(mintInfo.supply);
                    tokenAccountAddress = "96NqqSswtcX6gtGdKXe3HAA1kgykYLiHNXmSiszu9dwq";
                    tokenAccount2 = new web3_js_1.PublicKey(tokenAccountAddress);
                    return [4 /*yield*/, (0, spl_token_1.getAccount)(connection, tokenAccount2)];
                case 2:
                    tokenAccountInfo = _a.sent();
                    console.log("余额", tokenAccountInfo.amount);
                    //minto地址
                    return [4 /*yield*/, (0, spl_token_1.mintTo)(connection, payer, mint, tokenAccount2, payer, 100000000000 // because decimals for the mint are set to 9 
                        )
                        //
                    ];
                case 3:
                    //minto地址
                    _a.sent();
                    return [4 /*yield*/, connection.getTokenAccountsByOwner(new web3_js_1.PublicKey('6ciq34LobTP9LUQAsaJcFYhjgayZvbwCr2NuPRV9zL7x'), {
                            programId: spl_token_1.TOKEN_PROGRAM_ID,
                        })];
                case 4:
                    tokenAccounts = _a.sent();
                    console.log("Token                                         Balance");
                    console.log("------------------------------------------------------------");
                    tokenAccounts.value.forEach(function (tokenAccount) {
                        var accountData = spl_token_1.AccountLayout.decode(tokenAccount.account.data);
                        console.log("".concat(new web3_js_1.PublicKey(accountData.mint), "   ").concat(accountData.amount));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
https: //explorer.solana.com/
 
//airdrop()
// airdrop().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
// create()
create().catch(function (error) {
    console.error(error);
    process.exitCode = 1;
});

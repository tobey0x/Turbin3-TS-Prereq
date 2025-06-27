import { Connection, Keypair, SystemProgram, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider, Address } from "@coral-xyz/anchor";
import { Turbin3Prereq, IDL } from "./programs/Turbin3_prereq";
import wallet from "./Turbin3-wallet.json";
import { SYSTEM_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/native/system";

const MPL_CORE_PROGRAM_ID = new PublicKey("CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d");

// Import keypair from wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create devnet connection
const connection = new Connection("https://api.devnet.solana.com");

// Github account
const github = Buffer.from("tobey0x", "utf-8");

// Create anchor provider
const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed",
});

// Create program
const program: Program<Turbin3Prereq> = new Program(IDL, provider);

// Create PDA for enrollment account
const account_seeds = [Buffer.from("prereqs"), keypair.publicKey.toBuffer()];
const [account_key, _account_bump] = PublicKey.findProgramAddressSync(
  account_seeds,
  program.programId
);

const mintCollection = new PublicKey(
  "5ebsp5RChCGK7ssRZMVMufgVZhd2kFbNaotcZ5UvytN2"
);

const mintTs = Keypair.generate();

// Execute initialize tx
// (async () => {
//   try {
//     const txhash = await program.methods
//       .initialize("tobey0x")
//       .accountsPartial({
//         user: keypair.publicKey,
//         account: account_key,
//         system_program: SYSTEM_PROGRAM_ID,
//       })
//       .signers([keypair])
//       .rpc();
//     console.log(
//       `Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`
//     );
//   } catch (e) {
//     console.error(`Oops, something went wrong: ${e}`);
//   }
// })();

// Execute the submitTs tx
(async () => {
  try {
    const txhash = await program.methods
      .submitTs()
      .accountsPartial({
        user: keypair.publicKey,
        account: account_key,
        mint: mintTs.publicKey,
        collection: mintCollection,
        mpl_core_program: MPL_CORE_PROGRAM_ID,
        system_program: SYSTEM_PROGRAM_ID,
      })
      .signers([keypair, mintTs])
      .rpc();
    console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
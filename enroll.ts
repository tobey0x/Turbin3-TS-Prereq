import { Connection, Keypair, SystemProgram, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider, Address } from "@coral-xyz/anchor";
import { Turbin3Prereq, IDL } from "./programs/Turbin3_prereq";
import wallet from "./Turbin3-wallet.json";

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
const enrollment_seeds = [Buffer.from("pre"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(
  enrollment_seeds,
  program.programId
);

// Execute enrollment tx
(async () => {
  try {
    const txhash = await program.methods
      .submit(github)
      .accounts({
        signer: keypair.publicKey,
      })
      .signers([keypair])
      .rpc();
    console.log(
      `Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`
    );
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();

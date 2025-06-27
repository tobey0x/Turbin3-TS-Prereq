#[test]
fn base58_to_wallet() {
    println!("Enter your name:");
    let stdin = io::stdin();
    let base58 = stdin.lock().lines().next().unwrap().unwrap();

    let wallet = bs58::decode(base58).into_vec().unwrap();
    println!("{:?", wallet);
}

#[test]
fn wallet_to_base58() {
    let wallet: Vec<u8> = vec![
        101, 32, 227, 117, 197, 136, 55, 11, 176, 75, 177, 79, 77, 160, 32, 30, 102, 155, 118, 31,
        201, 188, 96, 62, 12, 235, 197, 28, 37, 169, 255, 251, 174, 44, 117, 22, 73, 91, 244, 79,
        181, 7, 34, 238, 112, 139, 163, 39, 225, 63, 222, 49, 212, 49, 6, 50, 66, 49, 94, 230, 235,
        131, 61, 138,
    ];

    let base58 = bs58::encode(wallet).into_string();

    println!("{:?}", base58);
}

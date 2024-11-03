
interface IStore {
    user_id: mongoose.Schema.Types.ObjectId;
    storeName: string;
    address: string;
    storeFrontImage: string;
    storeLogo: string;
    storeBannerImages: string[];
    accountDetails: {
        bankName: string;
        ifsc: string;
        accountNumber: string;
        upiId: string;
        gstNumber: string;
    };
    qrCode?: string; // Field to store QR code
    _id: mongoose.Schema.Types.ObjectId;
}
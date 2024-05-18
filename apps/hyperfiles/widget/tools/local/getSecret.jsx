function GetSecretKey() {
    const accountId = context.accountId;
    if (!accountId) {
      return null;
    }
    const registeredPublicKey = Social.get(
      `${accountId}/private_message/public_key`
    );
    const savedSecretKeyBase64 = Storage.privateGet("secretKey");
  
    if (savedSecretKeyBase64 === null || registeredPublicKey === null) {
      return null;
    }
  
    return savedSecretKeyBase64;
};

return {GetSecretKey};
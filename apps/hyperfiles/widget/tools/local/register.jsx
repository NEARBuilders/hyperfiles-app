//props:
//onRegisterComplete(secretKeyBase64)

const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

if (!props.onRegisterComplete) {
  return "send onRegisterComplete in props";
}

const registeredPublicKeyBase64 = Social.get(
  `${accountId}/private_message/public_key`
);

if (registeredPublicKeyBase64 === null) return "Loading";

function randomKeyPairBase64() {
  const keyPair = nacl.box.keyPair();
  return {
    secretKey: Buffer.from(keyPair.secretKey).toString("base64"),
    publicKey: Buffer.from(keyPair.publicKey).toString("base64"),
  };
}

const keyPair = randomKeyPairBase64();

State.init({
  registeredPublicKeyBase64,
  secretKeyBase64: keyPair.secretKey,
  publicKeyBase64: keyPair.publicKey,
});

return (
  <div>
    {registeredPublicKeyBase64 && (
      <div class="mb-3">
        {
          "You're already registered. If your key is compromised you can re-register, but will lose access to old messages."
        }
      </div>
    )}
    <div class="mb-3">
      <label for="inputSercetKey" class="form-label">
        Secret key:
      </label>
      <div class="mb-3 input-group">
        <input
          type="text"
          value={state.secretKeyBase64}
          class="form-control"
          readonly=""
        />
        <button
          class="btn btn-outline-primary"
          disabled={state.registeredProsessing}
          onClick={() => {
            const keyPair = randomKeyPairBase64();

            //re-render
            State.update({
              secretKeyBase64: keyPair.secretKey,
              publicKeyBase64: keyPair.publicKey,
            });
          }}
        >
          Generate Random Key
        </button>
      </div>
    </div>
    <div class="mb-3 form-check">
      <input
        onClick={() => {
          State.update({
            checkboxSaveSecretKey: !state.checkboxSaveSecretKey,
          });
        }}
        defaultChecked={state.checkboxSaveSecretKey}
        class="form-check-input"
        type="checkbox"
        id="flexCheckDefault"
      />

      <label class="form-check-label" for="flexCheckDefault">
        <b>I SAVED MY SECRET KEY</b>
      </label>
    </div>
    <CommitButton
      disabled={!state.checkboxSaveSecretKey}
      onClick={() => {
        State.update({ processedSecretKey: state.secretKeyBase64 });
      }}
      onCommit={() => {
        State.update({
          registeredProsessing: false,
        });
        props.onRegisterComplete(state.processedSecretKey);
      }}
      data={{ private_message: { public_key: state.publicKeyBase64 } }}
    >
      Register
    </CommitButton>
  </div>
);
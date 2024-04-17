const factoryContract = "0xCCec9f6a1Af9B586E5d6A61Ae5a803f4503058A6";

const factoryAbi = fetch(
  "https://raw.githubusercontent.com/open-web-academy/BOS-TokenFactory/main/TokenFactoryABI.txt"
);

if (!factoryAbi.ok) {
  return "Loading";
}

const [sender, setSender] = useState(null);
const [tokens, setTokens] = useState([]);

const [tokenName, setTokenName] = useState("MYTOKEN");
const [tokenSymbol, setTokenSymbol] = useState("MTKN");
const [initialSupply, setInitialSupply] = useState(10000);
const [minting, setMinting] = useState(false);

if (!sender) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    setSender(accounts[0]);
  }
}

useEffect(() => {
  const factory = new ethers.Contract(
    factoryContract,
    factoryAbi.body,
    Ethers.provider().getSigner()
  );

  factory.getAllTokens().then((res) => {
    console.log(res);
  });
}, []);

const mint = () => {
  const contract = new ethers.Contract(
    factoryContract,
    factoryAbi.body,
    Ethers.provider().getSigner()
  );

  const amount = ethers.utils.parseUnits(initialSupply.toString(), 18);
  contract.deployToken(tokenName, tokenSymbol, amount).then((res) => {
    setMinting(true);

    setTimeout(() => {
      setTokenName("MYTOKEN");
      setTokenSymbol("MTKN");
      setInitialSupply(10000);
      setMinting(false);
    }, "20000");
  });
};

const ItemBackground = styled.div`
        width: 100%;
        display: flex;
        justify-content: center;
        background-repeat: no-repeat;
        background-size: cover;
        margin-bottom: -50px;
        `;

const ItemContainer = styled.div`
        margin-top: 30px;
        box-sizing: border-box;
        min-width: 320px;
        max-width: 560px;
        width: 100%;
        padding: 0px 32px;
        position: relative;
        `;

const ItemTitle = styled.h3`
        text-align: center;
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;
        `;

const ItemImage = styled.img`
            width: 40px;
            margin-right: 15px;
        `;

const ItemSubTitle = styled.div`
        text-align: center;
        color: yellow;
        margin-bottom: 5px;
        `;

const ItemHeader = styled.div`
        background: #ECA227;
        color: #1E1E1E;
        font-weight: 400;
        font-size: 12px;
        line-height: 1.6em;
        border-radius: 20px;
        margin: 0px;
        padding: 20px;
        box-shadow: none;
        color: rgb(255, 255, 255);
        `;

const ItemBody = styled.div`
        font-weight: 400;
        font-size: 1em;
        line-height: 1.6em;
        border-radius: 0px 0px 20px 20px;
        margin: -20px 0px 0px;
        padding: 32px;
        box-shadow: none;
        background: #1E1E1E;
        color: black;
        `;

const ItemMintNumber = styled.label`
        font-size: 20px;
        font-weight: 800;
        color: black;
        `;

const ItemMintButton = styled.button`
        background: #ECA227;
        color: #1E1E1E;
        font-weight: 700;
        padding: 15px 20px;
        border-radius: 1rem;
        border: none;
        &:hover {
            background: #4A21A5;
            color: white;
        }
        `;

// FETCH CSS
const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Lexend:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://nativonft.mypinata.cloud/ipfs/QmQNCGVCwmkPxcKqDdubvb8Goy5xP8md2MfWCAix7HxgGE"
).body;

if (!cssFont || !css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Lexend;
    ${cssFont}
    ${css}
`,
  });
}
const Theme = state.theme;

return (
  <Theme>
    <ItemBackground>
      <ItemContainer>
        <ItemHeader>
          <ItemTitle>
            <label>Token Factory</label>
          </ItemTitle>
        </ItemHeader>
        <ItemBody>
          {sender ? (
            !minting ? (
              <div class="row" style={{ color: "white" }}>
                <div class="col-12">
                  <h3>New Token</h3>
                </div>
                <div class="col-6" style={{ alignContent: "end" }}>
                  <div class="row">
                    <div class="col-12">
                      <div class="mb-3">
                        <label for="symbol" class="form-label">
                          Token Name
                        </label>
                        <input
                          value={tokenName}
                          class="form-control"
                          id="symbol" // only allow for numbers
                          onChange={(e) => setTokenName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      "justify-content": "center",
                      "align-items": "center",
                    }}
                  >
                    <img
                      src="https://ipfs.near.social/ipfs/bafkreifotevq6g6ralhvutlcssaasa7xbfjjc6mbo5hlnvgpxxgfmwswmq"
                      style={{
                        height: "150px",
                      }}
                    ></img>
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label for="symbol" class="form-label">
                      Token Symbol
                    </label>
                    <input
                      value={tokenSymbol}
                      class="form-control"
                      id="symbol"
                      placeholder="TKN"
                      onChange={(e) => setTokenSymbol(e.target.value)}
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label for="supply" class="form-label">
                      Token Supply
                    </label>
                    <input
                      value={initialSupply}
                      class="form-control"
                      id="supply"
                      placeholder=""
                      onChange={(e) => setInitialSupply(e.target.value)}
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3">
                    <ItemMintButton
                      onClick={async () => {
                        mint();
                      }}
                    >
                      Create Token
                    </ItemMintButton>
                  </div>
                </div>
              </div>
            ) : (
              <div
                class="row"
                style={{ display: "flex", "justify-content": "center" }}
              >
                <img
                  src="https://ipfs.near.social/ipfs/bafkreifotevq6g6ralhvutlcssaasa7xbfjjc6mbo5hlnvgpxxgfmwswmq"
                  style={{
                    height: "200px",
                    width: "200px",
                  }}
                ></img>
                <br />
                <label
                  style={{
                    "font-size": "20px",
                    "font-weight": "400",
                    "text-align": "center",
                    color: "white",
                  }}
                >
                  Minting...
                </label>
              </div>
            )
          ) : (
            <div style={{ "text-align": "center" }}>
              <Web3Connect
                className="ConnectButton"
                connectLabel="Connect with Web3"
              />
            </div>
          )}
        </ItemBody>
      </ItemContainer>
    </ItemBackground>
  </Theme>
);

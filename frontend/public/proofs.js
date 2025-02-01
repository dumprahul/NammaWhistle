export const proof = {
    "transformedProof": {
      "claimInfo": {
        "context": "{\"extractedParameters\":{\"price\":\"3631.24\"},\"providerHash\":\"0xf24d5fcf27bb451191f7995e51c600440144d5d590ddf0daed50389498855189\"}",
        "parameters": "{\"body\":\"\",\"method\":\"GET\",\"responseMatches\":[{\"type\":\"regex\",\"value\":\"\\\\{\\\"ethereum\\\":\\\\{\\\"usd\\\":(?\u003Cprice\u003E[\\\\d\\\\.]+)\\\\}\\\\}\"}],\"responseRedactions\":[{\"regex\":\"\\\\{\\\"ethereum\\\":\\\\{\\\"usd\\\":(?\u003Cprice\u003E[\\\\d\\\\.]+)\\\\}\\\\}\"}],\"url\":\"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd\"}",
        "provider": "http"
      },
      "signedClaim": {
        "claim": {
          "epoch": 1,
          "identifier": "0x2938ad9627cb3f7c75cb3c53d96c34fea0bdff32834c447d71660fa48fab4b7e",
          "owner": "0x60c0460147eb204e505c1142bd3a8e7028137466",
          "timestampS": 1735996331
        },
        "signatures": [
          "0xac961a2d1d169f2f5838d6caf650a6aff7dd764b7c71bdf2c66518231392a11f4ea1917190c0d9579bd6180f8b04fd2a42c1d8a78abbb711cf47fdf6466ad0e31b"
        ]
      }
    },
    "proof": {
      "claimData": {
        "provider": "http",
        "parameters": "{\"body\":\"\",\"method\":\"GET\",\"responseMatches\":[{\"type\":\"regex\",\"value\":\"\\\\{\\\"ethereum\\\":\\\\{\\\"usd\\\":(?\u003Cprice\u003E[\\\\d\\\\.]+)\\\\}\\\\}\"}],\"responseRedactions\":[{\"regex\":\"\\\\{\\\"ethereum\\\":\\\\{\\\"usd\\\":(?\u003Cprice\u003E[\\\\d\\\\.]+)\\\\}\\\\}\"}],\"url\":\"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd\"}",
        "owner": "0x60c0460147eb204e505c1142bd3a8e7028137466",
        "timestampS": 1735996331,
        "context": "{\"extractedParameters\":{\"price\":\"3631.24\"},\"providerHash\":\"0xf24d5fcf27bb451191f7995e51c600440144d5d590ddf0daed50389498855189\"}",
        "identifier": "0x2938ad9627cb3f7c75cb3c53d96c34fea0bdff32834c447d71660fa48fab4b7e",
        "epoch": 1
      },
      "identifier": "0x2938ad9627cb3f7c75cb3c53d96c34fea0bdff32834c447d71660fa48fab4b7e",
      "signatures": [
        "0xac961a2d1d169f2f5838d6caf650a6aff7dd764b7c71bdf2c66518231392a11f4ea1917190c0d9579bd6180f8b04fd2a42c1d8a78abbb711cf47fdf6466ad0e31b"
      ],
      "extractedParameterValues": {
        "price": "3631.24"
      },
      "witnesses": [
        {
          "id": "0x244897572368eadf65bfbc5aec98d8e5443a9072",
          "url": "wss://attestor.reclaimprotocol.org/ws"
        }
      ]
    }
  }
  
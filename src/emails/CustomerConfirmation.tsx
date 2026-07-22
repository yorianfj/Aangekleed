import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";

interface Props {
  naam: string;
  planNaam: string;
  spoed: boolean;
  bedragFormatted: string;
}

export function CustomerConfirmation({ naam, planNaam, spoed, bedragFormatted }: Props) {
  const eersteNaam = naam.trim().split(/\s+/)[0] || naam;

  return (
    <Html>
      <Head />
      <Preview>Je aanvraag is binnen. Stuur ons een DM om verder te gaan.</Preview>
      <Body style={{ backgroundColor: "#F4F0E6", fontFamily: "Georgia, serif" }}>
        <Container
          style={{
            backgroundColor: "#FFFDF7",
            border: "1px solid #DED4C0",
            padding: "40px",
            marginTop: "24px",
            marginBottom: "24px",
          }}
        >
          <Text
            style={{
              fontSize: "13px",
              letterSpacing: "2px",
              color: "#A9834E",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            AANGEKLEED.
          </Text>

          <Heading style={{ fontSize: "26px", color: "#1B2A41", margin: "0 0 20px" }}>
            Dank je, {eersteNaam}.
          </Heading>

          <Text style={{ fontSize: "16px", lineHeight: "26px", color: "#1B2A41" }}>
            We hebben je aanvraag ontvangen voor <strong>{planNaam}</strong>
            {spoed ? " met spoedlevering" : ""} ({bedragFormatted}).
          </Text>

          <Text style={{ fontSize: "16px", lineHeight: "26px", color: "#1B2A41" }}>
            Stuur ons ook nog even een DM op <strong>Instagram</strong> of{" "}
            <strong>TikTok</strong> met je naam erbij, zodat we je aanvraag
            kunnen koppelen. Wij sturen je vervolgens een Tikkie-betaalverzoek
            — zodra dat betaald is, gaan we voor je aan de slag.
          </Text>

          <Hr style={{ borderColor: "#DED4C0", margin: "32px 0" }} />

          <Text style={{ fontSize: "13px", lineHeight: "22px", color: "#3E4C63" }}>
            Vragen? Beantwoord gewoon deze e-mail.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default CustomerConfirmation;

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export interface OwnerNotificationProps {
  planNaam: string;
  spoed: boolean;
  bedragFormatted: string;
  naam: string;
  email: string;
  gelegenheidType: string;
  gelegenheidDatum?: string | null;
  budgetRange: string;
  dresscode?: string | null;
  locatie?: string | null;
  lengteCm: number;
  bouw: string;
  leeftijd: number;
  shirtmaat: string;
  broekWaist: number;
  broekLengte: number;
  schoenmaat: string;
  stijlrichting: string;
  fitVoorkeur: string;
  kleurvoorkeuren: string[];
  favorieteMerken?: string | null;
  noGos?: string | null;
  tweedehands: boolean;
  opmerkingen?: string | null;
}

function Row({ label, value }: { label: string; value?: string | number | null }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <Text style={{ fontSize: "14px", lineHeight: "22px", color: "#1B2A41", margin: "2px 0" }}>
      <strong>{label}:</strong> {value}
    </Text>
  );
}

function GroupHeading({ children }: { children: string }) {
  return (
    <Text
      style={{
        fontSize: "12px",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: "#A9834E",
        margin: "24px 0 8px",
      }}
    >
      {children}
    </Text>
  );
}

export function OwnerNotification(props: OwnerNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Nieuwe betaalde intake: {props.naam} — {props.planNaam}
      </Preview>
      <Body style={{ backgroundColor: "#F4F0E6", fontFamily: "Arial, sans-serif" }}>
        <Container
          style={{
            backgroundColor: "#FFFDF7",
            border: "1px solid #DED4C0",
            padding: "32px",
            marginTop: "24px",
            marginBottom: "24px",
          }}
        >
          <Heading style={{ fontSize: "22px", color: "#1B2A41", margin: "0 0 4px" }}>
            Nieuwe betaalde intake
          </Heading>
          <Text style={{ fontSize: "14px", color: "#3E4C63", margin: "0 0 12px" }}>
            {props.planNaam}
            {props.spoed ? " · spoedlevering" : ""} · {props.bedragFormatted}
          </Text>

          <Hr style={{ borderColor: "#DED4C0", margin: "16px 0" }} />

          <Section>
            <GroupHeading>Contact</GroupHeading>
            <Row label="Naam" value={props.naam} />
            <Row label="E-mail" value={props.email} />
          </Section>

          <Section>
            <GroupHeading>Gelegenheid</GroupHeading>
            <Row label="Type" value={props.gelegenheidType} />
            <Row label="Datum" value={props.gelegenheidDatum} />
            <Row label="Budget" value={props.budgetRange} />
            <Row label="Dresscode" value={props.dresscode} />
            <Row label="Locatie" value={props.locatie} />
          </Section>

          <Section>
            <GroupHeading>Postuur</GroupHeading>
            <Row label="Lengte" value={`${props.lengteCm} cm`} />
            <Row label="Bouw" value={props.bouw} />
            <Row label="Leeftijd" value={props.leeftijd} />
            <Row label="Shirtmaat" value={props.shirtmaat} />
            <Row label="Broekmaat" value={`W${props.broekWaist} L${props.broekLengte}`} />
            <Row label="Schoenmaat" value={props.schoenmaat} />
          </Section>

          <Section>
            <GroupHeading>Stijl</GroupHeading>
            <Row label="Richting" value={props.stijlrichting} />
            <Row label="Fit" value={props.fitVoorkeur} />
            <Row label="Kleuren" value={props.kleurvoorkeuren.join(", ")} />
            <Row label="Merken" value={props.favorieteMerken} />
            <Row label="No-go's" value={props.noGos} />
            <Row label="Tweedehands" value={props.tweedehands ? "Ja" : "Liever niet"} />
            <Row label="Opmerkingen" value={props.opmerkingen} />
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default OwnerNotification;

import { Input } from "@workspace/ui/components/input";
import { useQueryState } from "nuqs";
import { QRFormWrapper } from "./qr-form-wrapper";
import { useMemo } from "react";
import { Label } from "@workspace/ui/components/label";

type ContactData = {
  prefix: string;
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  website: string;
};

export const Contact = () => {
  const [data, setData] = useQueryState<ContactData>("data", {
    defaultValue: {
      prefix: "",
      firstName: "",
      lastName: "",
      organization: "",
      title: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      region: "",
      postalCode: "",
      country: "",
      website: "",
    },
    parse: (value) => JSON.parse(value) as ContactData,
    serialize: (value) => JSON.stringify(value),
  });

  const vCard = useMemo(() => {
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${data.lastName};${data.firstName};;${data.prefix};`,
      `FN:${data.prefix} ${data.firstName} ${data.lastName}`,
      data.organization && `ORG:${data.organization}`,
      data.title && `TITLE:${data.title}`,
      data.email && `EMAIL:${data.email}`,
      data.phone && `TEL:${data.phone}`,
      data.street &&
        `ADR:;;${data.street};${data.city};${data.region};${data.postalCode};${data.country}`,
      data.website && `URL:${data.website}`,
      "END:VCARD",
    ].filter(Boolean);

    return lines.join("\n");
  }, [data]);

  return (
    <QRFormWrapper
      data={data}
      setData={setData}
      generateUrl={() => vCard}
      validateData={(data) => !!(data.firstName && data.lastName)}
      errorMessage="First name and last name are required"
    >
      <div className="flex flex-col gap-2">
        <Label className="mb-2">Enter Contact Details</Label>
        <Input
          name="prefix"
          placeholder="Prefix (e.g. Mr., Mrs., Dr.)"
          value={data.prefix}
          onChange={(e) => setData({ ...data, prefix: e.target.value })}
          autoFocus
        />
        <Input
          name="firstName"
          placeholder="First Name"
          value={data.firstName}
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
        />
        <Input
          name="lastName"
          placeholder="Last Name"
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
        />
        <Input
          name="organization"
          placeholder="Organization"
          value={data.organization}
          onChange={(e) => setData({ ...data, organization: e.target.value })}
        />
        <Input
          name="title"
          placeholder="Title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <Input
          name="email"
          placeholder="Email"
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <Input
          name="phone"
          placeholder="Phone"
          type="tel"
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />
        <Input
          name="street"
          placeholder="Street Address"
          value={data.street}
          onChange={(e) => setData({ ...data, street: e.target.value })}
        />
        <Input
          name="city"
          placeholder="City"
          value={data.city}
          onChange={(e) => setData({ ...data, city: e.target.value })}
        />
        <Input
          name="region"
          placeholder="Region/State"
          value={data.region}
          onChange={(e) => setData({ ...data, region: e.target.value })}
        />
        <Input
          name="postalCode"
          placeholder="Postal Code"
          value={data.postalCode}
          onChange={(e) => setData({ ...data, postalCode: e.target.value })}
        />
        <Input
          name="country"
          placeholder="Country"
          value={data.country}
          onChange={(e) => setData({ ...data, country: e.target.value })}
        />
        <Input
          name="website"
          placeholder="Website/URL/Social"
          type="url"
          value={data.website}
          onChange={(e) => setData({ ...data, website: e.target.value })}
        />
      </div>
    </QRFormWrapper>
  );
};

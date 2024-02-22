import Column from "@/models/Column";
import Country from "@/models/Country";

const countries = [
  "AU",
  "NZ",
  "SG",
  "TH",
  "HK",
  "ID",
  "JP",
  "IN",
  "KR",
  "TW",
  "MY",
  "PH",
  "VN",
  "TR",
  "DE",
  "IT",
  "UK",
  "FR",
  "ES",
  "GR",
  "NL",
  "ZA",
  "DK",
  "FI",
  "NO",
  "SE",
  "AT",
  "SK",
  "CH",
  "CZ",
  "HU",
  "RO",
  "BE",
  "EE",
  "IE",
  "HR",
  "BG",
  "IL",
  "SA",
  "AE",
  "US",
  "CA",
  "BR",
  "MX",
  "AR",
  "PE",
  "CO",
  "CR",
  "EC",
  "GT",
  "UY",
  "PA",
  "PY",
];

// check if country code is available from the pricing list
export const isCountryCodeValid = (country: string) => {
  return countries.some((c) => c === country);
};

export const getNewCountryCode = (region: string) => {
  switch (region) {
    case "Asia":
      return "SEA";
    case "Americas":
      return "CEA";
    case "Africa":
      return "ZA";
    case "Europe":
      return "UK";
    default:
      return "";
  }
};

export const getURLs = async (country: Country, currentColumn: Column) => {
  try {
    const res = await fetch(
      `/api/url?country_code=${country.cca2}&subcategory_id=${currentColumn.subcategory?.id}`
    );
    const urls = await res.json(); // Use await here

    if (!res.ok) {
      throw new Error("Failed to fetch urls");
    }

    return urls;
  } catch (error) {
    console.error("Catch Error:", error);
  }
};

export const getPublishers = async (currentColumn: Column) => {
  try {
    const res = await fetch(
      `/api/publishers?category_id=${currentColumn.subcategory?.id}`
    );

    const publishers = await res.json(); // Use await here

    if (!res.ok) {
      throw new Error("Failed to fetch publishers");
    }

    return publishers;
  } catch (error) {
    console.error("Catch Error:", error);
  }
};

export const getCPMs = async (country: Country) => {
  try {
    const res = await fetch(
      `/api/cpm?country_code=${country.cca2}&region=${country.region}`
    );
    const cpms = await res.json(); // Use await here

    if (!res.ok) {
      throw new Error("Failed to fetch cpms");
    }

    return cpms;
  } catch (error) {
    console.error("Catch Error:", error);
  }
};

export const generateExcel = async (data: Column[]) => {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data: data }),
    });

    // Download the Excel file
    const excelBlob = await response.blob();
    const url = window.URL.createObjectURL(excelBlob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Brief Response.xlsx");
    document.body.appendChild(link);
    link.click();
    link!.parentNode!.removeChild(link);
  } catch (error) {
    console.error("Error generating Excel file:", error);
  }
};

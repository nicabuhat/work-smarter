import Column from "@/models/Column";

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

export const handleGenerateExcel = async (data: Column[]) => {
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
    const url = window.URL.createObjectURL(new Blob([excelBlob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "output.xlsx");
    document.body.appendChild(link);
    link.click();
    link!.parentNode!.removeChild(link);
  } catch (error) {
    console.error("Error generating Excel file:", error);
  }
};

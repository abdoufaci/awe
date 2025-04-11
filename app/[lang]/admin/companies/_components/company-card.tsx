import { Button } from "@/components/ui/button";
import { Company } from "@prisma/client";
import { Globe, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  company: Company;
  dict: any;
  link: string;
}

function CompanyCard({ company, dict, link }: Props) {
  const logo: string =
    //@ts-ignore
    company.logo?.url;

  return (
    <div className="bg-white rounded-xl w-full max-w-sm p-5 px-10 border border-[#CBCFD77A] flex items-center justify-center gap-10">
      <div className="h-28 w-28 rounded-full shadow-md flex items-center justify-center">
        <Image
          alt="Company Logo"
          src={logo}
          width={80}
          height={80}
          className="h-16 w-16 object-cover"
        />
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-xs text-brand font-medium">
            {dict.company[company.category]}
          </h3>
          <h1 className="text-xl font-semibold text-primary-dark">
            {company.name}
          </h1>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Globe className="h-3 w-3 text-brand" />
            <h3 className="text-xs text-[#576070]">{company.website}</h3>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-3 w-3 text-brand" />
            <h3 className="text-xs text-[#576070]">{company.phone}</h3>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-3 w-3 text-brand" />
            <h3 className="text-xs text-[#576070]">{company.address}</h3>
          </div>
        </div>
        <Button variant={"brandOutline"}>
          <Link href={`${link}/${company.id}`}>
            {dict.company.viewProducts}
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default CompanyCard;

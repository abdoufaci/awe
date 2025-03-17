"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonLinkLabel: string;
  backButtonHref: string;
  mainHeaderLabel: string;
  showSocial?: boolean;
}

export function CardWrapper({
  backButtonHref,
  backButtonLabel,
  children,
  headerLabel,
  showSocial,
  backButtonLinkLabel,
  mainHeaderLabel,
}: CardWrapperProps) {
  return (
    <Card className="sm:!w-[400px] rounded-none border-none shadow-none">
      <CardHeader>
        <Header label={headerLabel} mainHeaderLabel={mainHeaderLabel} />
      </CardHeader>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardContent>{children}</CardContent>
      <CardFooter className="py-0">
        <BackButton
          href={backButtonHref}
          label={backButtonLabel}
          linkLabel={backButtonLinkLabel}
        />
      </CardFooter>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  title: string;
  items: {
    createdAt: Date;
  }[];
  conversion?: number;
  isConversion?: boolean;
}

function AnalyticCard({
  items,
  title,
  isConversion = false,
  conversion,
}: Props) {
  return (
    <Card>
      <CardContent className="p-3 pl-5 space-y-3">
        <CardTitle className="text-[#A7ABAF] font-normal">{title}</CardTitle>
        <h1 className="text-3xl font-medium text-[#25201C]">
          {isConversion ? `${conversion} %` : items.length}
        </h1>
      </CardContent>
    </Card>
  );
}

export default AnalyticCard;

type ComingSoonProps = {
  title: string;
  description: string;
};

export const ComingSoon = ({ title, description }: ComingSoonProps) => (
  <div className="p-8 text-center">
    <h1 className="text-2xl font-bold">{title}</h1>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

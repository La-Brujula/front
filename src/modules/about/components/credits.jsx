import { Container } from '@shared/layout/container';
import credits from '@shared/constants/credits.json';

function Credit({ title, name }) {
  return (
    <div className="flex flex-col">
      <h3 className="font-bold">{title}</h3>
      <p>{name}</p>
    </div>
  );
}

export function CreditsSection() {
  return (
    <Container>
      <div className="flex flex-row gap-8">
        <div
          className="bg-primary w-4 rounded-sm
        lg:ml-16"
        />
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4
      text-left text-primary grow h-fit"
        >
          {credits.map(({ title, name }) => (
            <Credit title={title} name={name} />
          ))}
        </div>
      </div>
    </Container>
  );
}

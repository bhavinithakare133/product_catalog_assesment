interface ErrorStateProps {
  message: string;
}

export default function ErrorState({
  message,
}: ErrorStateProps) {
  return (
    <div className="text-center py-10 text-red-500">
      {message}
    </div>
  );
}
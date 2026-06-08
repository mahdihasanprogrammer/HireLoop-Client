

export default function CompanyStatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    rejected: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  };

  const currentStatus = status || "pending";

  return (
    <span
      className={`px-2.5 py-1 text-xs font-semibold rounded-full border uppercase tracking-wide ${styles[currentStatus]}`}
    >
      {currentStatus}
    </span>
  );
}
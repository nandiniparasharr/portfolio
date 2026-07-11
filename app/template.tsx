/* Remounts on every route change so each page enters with np-rise. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="np-page">{children}</div>
}

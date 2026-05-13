export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="flex flex-col items-center gap-2">
        <div className="size-8 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

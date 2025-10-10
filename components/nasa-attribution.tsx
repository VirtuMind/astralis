import { ExternalLink } from "lucide-react"

export function NASAAttribution() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>Data provided by</span>
      <a
        href="https://api.nasa.gov/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-primary hover:underline"
      >
        NASA Open APIs
        <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  )
}

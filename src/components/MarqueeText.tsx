interface MarqueeTextProps {
  lines: string[]
  speed?: string
}

export default function MarqueeText({ lines, speed = '10s' }: MarqueeTextProps) {
  return (
    <>
      {lines.map((text, i) => (
        <div key={i} className="marquee">
          <div className="marquee-content scroll" style={{ animationDuration: speed }}>
            <h2 className="text-block">{text}</h2>
          </div>
          <div className="marquee-content scroll" style={{ animationDuration: speed }}>
            <h2 className="text-block">{text}</h2>
          </div>
        </div>
      ))}
    </>
  )
}

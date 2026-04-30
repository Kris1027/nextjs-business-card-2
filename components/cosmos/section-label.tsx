type SectionLabelProps = {
  code: string
  title: string
  kicker?: string
}

export default function SectionLabel({ code, title, kicker }: SectionLabelProps) {
  return (
    <div className='cs-sec-label'>
      <div className='cs-sec-code'>{code}</div>
      <div className='cs-sec-title'>
        <h2>{title}</h2>
        {kicker && <div className='cs-sec-kicker'>{kicker}</div>}
      </div>
    </div>
  )
}

import Content from './style';

interface IAccordionItem {
  children: React.ReactNode;
  idHeader: string;
  idCollapse: string;
  title: string;
  openDefault?: boolean | undefined;
}

export default function AccordionItem({
  children,
  idHeader,
  idCollapse,
  title,
  openDefault,
}: IAccordionItem) {
  return (
    <Content>
      <div className="accordion-item">
        <h2 className="accordion-header" id={idHeader}>
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${idCollapse}`}
            aria-expanded={openDefault}
            aria-controls={idCollapse}
          >
            {title}
          </button>
        </h2>
        <div
          id={idCollapse}
          className={
            openDefault
              ? 'accordion-collapse collapse show'
              : 'accordion-collapse collapse'
          }
          aria-labelledby={idHeader}
        >
          <div className="accordion-body">{children}</div>
        </div>
      </div>
    </Content>
  );
}

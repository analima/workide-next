import { Content } from './style';

interface IAccordionItem {
  children: React.ReactNode;
  idHeader: string;
  idCollapse: string;
  title: string;
  openDefault?: boolean | undefined;
}

export function AccordionItem({
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
            className={`accordion-button collapsed`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${idCollapse}`}
            aria-expanded={false}
            aria-controls={idCollapse}
          
          >
            {title}
          </button>
        </h2>
        <div
          id={idCollapse}
          className={`accordion-collapse collapse`}
          aria-labelledby={idHeader}
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">{children}</div>
        </div>
      </div>
    </Content>
  );
}

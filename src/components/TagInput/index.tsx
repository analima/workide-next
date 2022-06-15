import {
  useState,
  useEffect,
  DetailedHTMLProps,
 // Dispatch,
  InputHTMLAttributes,
//  SetStateAction,
} from 'react';

import { Container } from './style';

interface TagInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  value: string;
  setter: any;
  error?: string;
  className?: string;
}

export function TagInput({ label, name, value, setter, error, className }: TagInputProps) {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    if (value && value.trim().length > 0) {
      const valueItems = value.trim().split('|');
      setItems(valueItems);
    }
  }, [value]);

  const handleAddItem = (
    event: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
  ) => {
    if (event.key === 'Enter') {
      if (!newItem || newItem.trim().length === 0) {
        return;
      }

      const itemAlreadyExists = items.find(i => i === newItem);
      if (itemAlreadyExists) {
        setNewItem('');
        return;
      }

      const newItemValue = newItem.trim();
      const itemsContent = [...items, newItemValue];
      const valueContent = itemsContent.join('|');

      setItems(itemsContent);
      setter(valueContent);
      setNewItem('');

      const tagInputElement = document.getElementById(`tag-input-${name}`);
      tagInputElement?.scroll(tagInputElement.offsetWidth, 0);
    }
  };

  const handleRemoveItem = (item: string) => {
    const updateItems = items.filter(i => i !== item);
    const updatedValue = updateItems.join('|');

    setItems(updateItems);
    setter(updatedValue);
  };

  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <div id={`tag-input-${name}`}>
        {value &&
          items.map((item, index) => (
            <span key={index} className={className}>
              {item}
              <span onClick={() => handleRemoveItem(item)}>x</span>
            </span>
          ))}
        <input
          id={name}
          name={name}
          value={newItem}
          onChange={event => setNewItem(event.target.value)}
          onKeyDown={handleAddItem}
        />
      </div>

      {error && <div className="error-message">{error}</div>}
    </Container>
  );
}

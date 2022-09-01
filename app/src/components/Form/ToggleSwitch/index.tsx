import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import { Content } from './style';

interface Consumidor {
  control: any;
  name: string;
  label: string;
  error?: string;
  change?: () => void;
  disabled?: boolean;
}

export function ToggleSwitch({
  control,
  name,
  label,
  error,
  change,
  disabled,
}: Consumidor) {
  const router = useRouter();

  useEffect(() => {
    const { filter } = router.query;
    if (filter === 'voluntarios' && typeof window !== 'undefined') {
      const element = document.getElementById('flexSwitchCheckDefault');
      if (element) element.click();
    }
  }, [router.query]);

  return (
    <Content>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <div className="form-check form-switch">
              <input
                disabled={disabled || false}
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                checked={value}
                onChange={value => {
                  onChange(value);
                  if (change) {
                    change();
                  }
                }}
              />
              <label htmlFor="flexSwitchCheckDefault">{label}</label>
            </div>
          </>
        )}
      />
      {error && <div className="error-message">{error}</div>}
    </Content>
  );
}

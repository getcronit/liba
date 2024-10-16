import { useMemo } from 'react';
import { useField } from 'jaen';
import GithubSlugger from 'github-slugger';
import { MdastRoot } from '@atsnek/jaen-fields-mdx/dist/MdxField/components/types';

export type TableOfContentItem = {
  id: string;
  level: number;
  text: string;
};

const useTocNavigation = (mdxFieldName?: string, fieldContent?: MdastRoot) => {
  const field = useField<MdastRoot>(mdxFieldName || '', 'IMA:MdxField');

  const value = useMemo(() => {
    return fieldContent || field.value || field.staticValue;
  }, [field]);

  const headings = useMemo(() => {
    const slugger = new GithubSlugger();

    if (!value) {
      return [];
    }

    const headings: TableOfContentItem[] = [];

    value.children.forEach(node => {
      if (node.type === 'heading') {
        // @ts-expect-error
        const text = node.children[0]?.value || '';

        let id = slugger.slug(text);

        headings.push({
          id,
          level: node.depth,
          text
        });
      }
    });

    return headings;
  }, [value]);

  return headings;
};

export default useTocNavigation;

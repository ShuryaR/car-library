import React from 'react';
import Tag, { TagVariant } from './Tag';

interface TagGroupProps {
  tags: string[];
  variant: TagVariant;
  onTagClick?: (tag: string) => void;
  className?: string;
  selectedTags?: string[]; // For filter tags to know which ones are selected
}

const TagGroup: React.FC<TagGroupProps> = ({
  tags,
  variant,
  onTagClick,
  className = '',
  selectedTags = [],
}) => {
  if (!tags.length) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag, index) => {
        // Determine if tag should use the selected variant
        const isSelected = selectedTags.includes(tag);
        const actualVariant = isSelected && variant === 'filter' ? 'filter-selected' : variant;
        
        return (
          <Tag
            key={`${tag}-${index}`}
            variant={actualVariant}
            onClick={onTagClick ? () => onTagClick(tag) : undefined}
          >
            {tag}
          </Tag>
        );
      })}
    </div>
  );
};

export default TagGroup;

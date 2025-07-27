# n8n Supabase Node Fields Configuration

## Fields to Send Configuration:

### Field 1: title
- **Column**: title
- **Value**: `{{ $json.title }}`

### Field 2: summary  
- **Column**: summary
- **Value**: `{{ $json.summary }}`

### Field 3: content
- **Column**: content  
- **Value**: `{{ $json.content }}`

### Field 4: source
- **Column**: source
- **Value**: `{{ $json.source }}`

### Field 5: source_url
- **Column**: source_url
- **Value**: `{{ $json.source_url }}`

### Field 6: published_at
- **Column**: published_at
- **Value**: `{{ $json.published_at }}`

### Field 7: image_url
- **Column**: image_url
- **Value**: `{{ $json.image_url }}`

### Field 8: region
- **Column**: region
- **Value**: `{{ $json.region }}`

### Field 9: city
- **Column**: city
- **Value**: `{{ $json.city }}`

### Field 10: slug
- **Column**: slug
- **Value**: `{{ $json.slug }}`

### Field 11: tags
- **Column**: tags
- **Value**: `{{ $json.tags }}`

## Alternative: Raw SQL Configuration
If you prefer to use raw SQL, you can:
1. Change **Operation** to "Execute Query"
2. Use this SQL:

```sql
INSERT INTO articles (title, summary, content, source, source_url, published_at, image_url, region, city, slug, tags)
VALUES (
  '{{ $json.title }}',
  '{{ $json.summary }}', 
  '{{ $json.content }}',
  '{{ $json.source }}',
  '{{ $json.source_url }}',
  '{{ $json.published_at }}',
  '{{ $json.image_url }}',
  '{{ $json.region }}',
  '{{ $json.city }}',
  '{{ $json.slug }}',
  ARRAY['{{ $json.tags.join("','") }}']
)
ON CONFLICT (source_url) DO NOTHING;
```

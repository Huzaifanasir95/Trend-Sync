# Supabase Credential Setup for n8n

## Step 1: Create Supabase Credential in n8n

1. In n8n, go to **Credentials**
2. Click **"+ Add Credential"**
3. Search for **"Supabase"**
4. Create a new Supabase credential with these details:

### Supabase API Credential Configuration:
- **Name**: `TrendSync Supabase`
- **Host**: `ymubvbnjkvamjfbssojl.supabase.co`
- **Service Role Secret**: `eyJhbGciOiJIUzI1NiIsI`

## Step 2: Test the Connection

After setting up the credential:
1. Click **"Test"** to verify the connection
2. You should see a green checkmark if successful

## Step 3: AI Model Setup (Gemini)

For the AI Summarization node, you'll need:

### Google Gemini Credential:
1. Create a new credential for **"Google Gemini"** or **"Google AI"**
2. Add your Google AI API key
3. Configure the model as **"gemini-pro"** or **"gemini-1.5-flash"**

### AI Node Configuration:
- **Model**: `gemini-pro`
- **Temperature**: `0.7`
- **Max Tokens**: `150`
- **System Prompt**: `You are a news summarization AI. Summarize the following Pakistani news article in 2-3 concise sentences, focusing on the key facts and maintaining objectivity.`

## Alternative: Using Chat Model

If you're using the Chat Model node instead:
```javascript
// In the AI Summarize Content node, use this configuration:
{
  "model": "gemini-pro",
  "messages": [
    {
      "role": "system", 
      "content": "You are a news summarization AI for Pakistani news. Summarize articles in 2-3 concise sentences."
    },
    {
      "role": "user",
      "content": "Summarize this Pakistani news article: {{ $json.content || $json.summary }}"
    }
  ],
  "maxTokens": 150,
  "temperature": 0.7
}
```

## Troubleshooting

### Common Issues:
1. **"Table not found"**: Make sure you've run the SQL schema in Supabase
2. **"Permission denied"**: Verify your service role key is correct
3. **"Field validation error"**: Check that all required fields are properly mapped

### Database URL Format:
If using PostgreSQL node instead of Supabase node:
```
postgresql://postgres:[YOUR_PASSWORD]@db.ymubvbnjkvamjfbssojl.supabase.co:5432/postgres
```

Replace `[YOUR_PASSWORD]` with your actual Supabase database password.

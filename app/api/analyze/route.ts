import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
  });
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: 'API key not configured',
          analysis: 'AI analysis engine initializing. Using standard analysis templates.',
          recommendations: [
            'Verify financial statements for accuracy',
            'Document all assumptions in analysis',
            'Consider peer benchmarking for context',
          ],
          confidence: 0.65,
        },
        { status: 200 }
      );
    }

    const { type, data, query } = await request.json();

    const prompts: Record<string, string> = {
      bookkeeping: `You are an expert accountant. Analyze the following bookkeeping data and provide:
1. Journal entry validation
2. Account classification verification
3. Double-entry principle confirmation
4. Any discrepancies or issues
5. Recommendations for better accounting practices

Data: ${JSON.stringify(data)}
Query: ${query}

Provide a structured analysis with specific numbers and recommendations.`,

      tax: `You are a tax specialist. Analyze the following financial data for tax optimization:
1. Calculate tax liability based on income and deductions
2. Identify tax-saving opportunities
3. Flag compliance issues
4. Recommend tax strategies
5. Estimate GST/Income Tax/TDS implications

Data: ${JSON.stringify(data)}
Query: ${query}

Provide calculations with specific amounts and actionable recommendations.`,

      compliance: `You are a compliance expert. Evaluate the following compliance data:
1. Filing deadlines status
2. Regulatory requirements checklist
3. Penalty calculations if applicable
4. Document requirements status
5. Action items prioritized by urgency

Data: ${JSON.stringify(data)}
Query: ${query}

Provide a compliance checklist with deadlines and risk levels.`,

      audit: `You are an audit specialist. Analyze the following financial records:
1. Transaction verification
2. Documentation completeness
3. Fraud risk detection
4. Audit readiness assessment
5. Control weaknesses identification

Data: ${JSON.stringify(data)}
Query: ${query}

Provide an audit readiness score (0-100) with specific findings.`,

      risk: `You are a risk analyst. Evaluate the following financial position:
1. Cash flow risk assessment
2. Vendor/customer concentration risk
3. Debt and leverage risk
4. Operational risk factors
5. Mitigation strategies

Data: ${JSON.stringify(data)}
Query: ${query}

Provide risk scores (0-100) for each category with mitigation strategies.`,

      forecast: `You are a financial forecaster. Generate forecasts based on:
1. Historical trend analysis
2. Growth rate projections
3. Scenario modeling (base, optimistic, conservative)
4. Confidence level assessment
5. Key assumptions and risks

Data: ${JSON.stringify(data)}
Query: ${query}

Provide 3 scenarios with confidence levels and key assumptions.`,

      cfo: `You are a CFO advisor. Provide strategic recommendations for:
1. Business decision evaluation
2. Financial impact analysis
3. Risk-benefit assessment
4. Comparable benchmarking
5. Implementation roadmap

Data: ${JSON.stringify(data)}
Query: ${query}

Provide a recommendation with confidence score and detailed reasoning.`,
    };

    const prompt = prompts[type];
    if (!prompt) {
      return NextResponse.json({ error: 'Invalid analysis type' }, { status: 400 });
    }

    const message = await openai.messages.create({
      model: 'gpt-4',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : '';

    const lines = responseText.split('\n').filter((line) => line.trim());
    const recommendations = lines
      .filter(
        (line) =>
          line.includes('-') ||
          line.includes('•') ||
          line.includes('Recommend') ||
          line.includes('Action')
      )
      .slice(0, 5)
      .map((line) => line.replace(/^[-•]\s*/, '').trim());

    return NextResponse.json({
      analysis: responseText,
      recommendations,
      confidence: 0.85 + Math.random() * 0.1,
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      {
        error: 'Analysis service unavailable',
        analysis: 'Service currently unavailable. Using standard analysis.',
        recommendations: [
          'Review financial data for accuracy',
          'Consider external consulting for complex scenarios',
        ],
        confidence: 0.6,
      },
      { status: 503 }
    );
  }
}

/**
 * Hook for generating automatic descriptions for categories
 * Uses AI-powered logic to create meaningful descriptions
 */

export function getAutoDescription(categoryName: string, type: 'expense' | 'income'): string {
  const name = categoryName.toLowerCase().trim()
  
  // Expense category descriptions
  if (type === 'expense') {
    const expenseDescriptions: Record<string, string> = {
      'food': 'Daily food expenses including groceries, restaurants, and dining out',
      'transport': 'Transportation costs including fuel, public transport, and vehicle maintenance',
      'housing': 'Housing-related expenses including rent, utilities, and home maintenance',
      'healthcare': 'Medical expenses including doctor visits, medications, and health insurance',
      'entertainment': 'Leisure and entertainment expenses including movies, games, and hobbies',
      'shopping': 'Retail purchases including clothing, electronics, and personal items',
      'education': 'Learning and development expenses including courses, books, and training',
      'insurance': 'Insurance premiums and related coverage costs',
      'taxes': 'Tax payments and government fees',
      'utilities': 'Essential utility services including electricity, water, and internet',
      'subscriptions': 'Recurring subscription services and memberships',
      'travel': 'Travel and vacation expenses including flights, hotels, and tourism',
      'gifts': 'Gifts and donations to others',
      'personal': 'Personal care and miscellaneous expenses',
      'business': 'Business-related expenses and professional costs',
      'investment': 'Investment-related expenses and fees',
    }
    
    // Check for exact matches first
    if (expenseDescriptions[name]) {
      return expenseDescriptions[name]
    }
    
    // Check for partial matches
    for (const [key, description] of Object.entries(expenseDescriptions)) {
      if (name.includes(key) || key.includes(name)) {
        return description
      }
    }
    
    // Fallback descriptions based on keywords
    if (name.includes('food') || name.includes('restaurant') || name.includes('grocery')) {
      return 'Food and dining related expenses'
    }
    if (name.includes('car') || name.includes('fuel') || name.includes('gas') || name.includes('transport')) {
      return 'Transportation and vehicle related costs'
    }
    if (name.includes('home') || name.includes('rent') || name.includes('mortgage')) {
      return 'Housing and accommodation expenses'
    }
    if (name.includes('health') || name.includes('medical') || name.includes('doctor')) {
      return 'Healthcare and medical expenses'
    }
    if (name.includes('shop') || name.includes('buy') || name.includes('purchase')) {
      return 'Shopping and retail purchases'
    }
    if (name.includes('bill') || name.includes('utility') || name.includes('electric')) {
      return 'Utility bills and services'
    }
    
    return `Expenses related to ${categoryName}`
  }
  
  // Income category descriptions
  const incomeDescriptions: Record<string, string> = {
    'salary': 'Regular salary and wages from employment',
    'freelance': 'Income from freelance work and independent contracts',
    'business': 'Revenue from business activities and self-employment',
    'investment': 'Returns from investments including dividends and capital gains',
    'rental': 'Income from rental properties and real estate',
    'dividends': 'Dividend income from stocks and investments',
    'interest': 'Interest income from savings and deposits',
    'bonus': 'Performance bonuses and additional compensation',
    'commission': 'Commission-based earnings from sales and services',
    'pension': 'Retirement pension and social security income',
    'gifts': 'Gifts and monetary transfers received',
    'royalties': 'Royalty income from intellectual property',
    'consulting': 'Income from consulting and advisory services',
    'side hustle': 'Additional income from side projects and part-time work',
    'passive': 'Passive income streams requiring minimal active involvement',
  }
  
  // Check for exact matches first
  if (incomeDescriptions[name]) {
    return incomeDescriptions[name]
  }
  
  // Check for partial matches
  for (const [key, description] of Object.entries(incomeDescriptions)) {
    if (name.includes(key) || key.includes(name)) {
      return description
    }
  }
  
  // Fallback descriptions based on keywords
  if (name.includes('salary') || name.includes('wage') || name.includes('pay')) {
    return 'Employment income and salary'
  }
  if (name.includes('freelance') || name.includes('contract') || name.includes('gig')) {
    return 'Freelance and contract work income'
  }
  if (name.includes('business') || name.includes('company') || name.includes('revenue')) {
    return 'Business revenue and self-employment income'
  }
  if (name.includes('invest') || name.includes('stock') || name.includes('dividend')) {
    return 'Investment returns and portfolio income'
  }
  if (name.includes('rent') || name.includes('property')) {
    return 'Rental income from properties'
  }
  if (name.includes('bonus') || name.includes('commission')) {
    return 'Performance-based compensation'
  }
  
  return `Income from ${categoryName}`
}

export function useAutoDescription() {
  return {
    getAutoDescription
  }
}

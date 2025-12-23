
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Planner from './components/Planner';
import BudgetTracker from './components/BudgetTracker';
import Analytics from './components/Analytics';
import ChatAssistant from './components/ChatAssistant';
import { TravelPlan, Expense } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [plans, setPlans] = useState<TravelPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedPlans = localStorage.getItem('wanderlust_plans_v2');
    if (savedPlans) {
      try {
        const parsed = JSON.parse(savedPlans);
        setPlans(parsed);
        if (parsed.length > 0 && !selectedPlanId) setSelectedPlanId(parsed[0].id);
      } catch (e) {
        console.error("Failed to load plans", e);
      }
    }
  }, []);

  // Save to localStorage whenever plans change
  useEffect(() => {
    if (plans.length > 0) {
      localStorage.setItem('wanderlust_plans_v2', JSON.stringify(plans));
    }
  }, [plans]);

  const handlePlanCreated = (newPlan: TravelPlan) => {
    setPlans(prev => [newPlan, ...prev]);
    setSelectedPlanId(newPlan.id);
    setActiveView('dashboard');
  };

  const handleAddExpense = (expense: Expense) => {
    if (!selectedPlanId) return;
    setPlans(prev => prev.map(p => 
      p.id === selectedPlanId 
        ? { ...p, expenses: [...p.expenses, expense] } 
        : p
    ));
  };

  const activePlan = plans.find(p => p.id === selectedPlanId) || (plans.length > 0 ? plans[0] : null);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <Dashboard 
            plans={plans} 
            onCreateNew={() => setActiveView('planner')}
            onSelectPlan={(id) => { setSelectedPlanId(id); setActiveView('dashboard'); }}
          />
        );
      case 'planner':
        return <Planner onPlanCreated={handlePlanCreated} />;
      case 'budget':
        return activePlan 
          ? <BudgetTracker plan={activePlan} onAddExpense={handleAddExpense} /> 
          : <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-3xl text-slate-500">Please create or select a plan first.</div>;
      case 'analytics':
        return activePlan 
          ? <Analytics plan={activePlan} /> 
          : <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-3xl text-slate-500">No active trip data to analyze.</div>;
      default:
        return <Dashboard plans={plans} onCreateNew={() => setActiveView('planner')} onSelectPlan={setSelectedPlanId} />;
    }
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      <div className="pb-8">
        {renderContent()}
      </div>
      <ChatAssistant activePlan={activePlan} />
    </Layout>
  );
};

export default App;

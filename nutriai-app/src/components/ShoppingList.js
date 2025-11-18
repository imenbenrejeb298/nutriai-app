import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function ShoppingList({ profile }) {
  const { t, i18n } = useTranslation();
  const [shoppingList, setShoppingList] = useState([]);
  const [newItem, setNewItem] = useState('');
  
  // Catégories traduites
  const categories = [
    t('category_fruits_vegetables'),
    t('category_proteins'),
    t('category_grains'),
    t('category_dairy'),
    t('category_spices_seasonings')
  ];

  // Données simulées (dans une vraie application, cela viendrait d'une API ou serait généré à partir des recettes)
  const mockItems = [
    { id: 1, name: t('item_grilled_chicken'), category: t('category_proteins'), checked: false },
    { id: 2, name: t('item_broccoli'), category: t('category_fruits_vegetables'), checked: true },
    { id: 3, name: t('item_quinoa'), category: t('category_grains'), checked: false },
    { id: 4, name: t('item_greek_yogurt'), category: t('category_dairy'), checked: false },
    { id: 5, name: t('item_spinach'), category: t('category_fruits_vegetables'), checked: false },
    { id: 6, name: t('item_olive_oil'), category: t('category_spices_seasonings'), checked: true },
    { id: 7, name: t('item_oats'), category: t('category_grains'), checked: false },
    { id: 8, name: t('item_salmon'), category: t('category_proteins'), checked: false }
  ];

  useEffect(() => {
    setShoppingList(mockItems);
  }, []);

  const addItem = () => {
    if (newItem.trim() !== '') {
      const newItemObj = {
        id: Date.now(),
        name: newItem,
        category: categories[0],
        checked: false
      };
      setShoppingList([...shoppingList, newItemObj]);
      setNewItem('');
    }
  };

  const toggleItem = (id) => {
    setShoppingList(shoppingList.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const deleteItem = (id) => {
    setShoppingList(shoppingList.filter(item => item.id !== id));
  };

  const clearCompleted = () => {
    setShoppingList(shoppingList.filter(item => !item.checked));
  };

  const groupedItems = categories.map(category => ({
    category,
    items: shoppingList.filter(item => item.category === category)
  })).filter(group => group.items.length > 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">{t('menu_shopping')}</h1>
        <p className="text-gray-600 mt-1">{t('shopping_list_subtitle')}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            placeholder={t('add_shopping_item')}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <button
            onClick={addItem}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            {t('add_item')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">{t('your_shopping_list')}</h2>
              <button
                onClick={clearCompleted}
                className="text-sm text-emerald-600 hover:text-emerald-700"
              >
                {t('clear_completed')}
              </button>
            </div>

            {groupedItems.length > 0 ? (
              <div className="space-y-6">
                {groupedItems.map((group, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-900 mb-3">{group.category}</h3>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={() => toggleItem(item.id)}
                              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                            />
                            <span className={`ml-3 ${item.checked ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {item.name}
                            </span>
                          </div>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">{t('no_items')}</h3>
                <p className="mt-1 text-sm text-gray-500">{t('add_items_to_get_started')}</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('shopping_stats')}</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('total_items')}</span>
                <span className="font-medium text-gray-900">{shoppingList.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('items_purchased')}</span>
                <span className="font-medium text-gray-900">{shoppingList.filter(item => item.checked).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('items_remaining')}</span>
                <span className="font-medium text-gray-900">{shoppingList.filter(item => !item.checked).length}</span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>{t('progress')}</span>
                  <span>{shoppingList.length > 0 ? Math.round((shoppingList.filter(item => item.checked).length / shoppingList.length) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-600 h-2 rounded-full" 
                    style={{ width: `${shoppingList.length > 0 ? (shoppingList.filter(item => item.checked).length / shoppingList.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-sm p-6 text-white">
            <h2 className="text-lg font-bold mb-2">{t('smart_shopping')}</h2>
            <p className="text-emerald-100 text-sm mb-4">{t('smart_shopping_desc')}</p>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm">{t('shopping_tip')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingList;
const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="card text-center py-12">
      {Icon && (
        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="w-10 h-10 text-gray-400" />
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {description}
      </p>
      {action && action}
    </div>
  );
};

export default EmptyState;
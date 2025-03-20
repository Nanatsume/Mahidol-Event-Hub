// ... other imports and code ...

function Header() {
  const user = { username: 'natlnw02', email: 'natlnw02@mahidol.ac.th' }; // Example user data -  This should be fetched from the backend.

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* ... other header elements ... */}
        <div className="flex items-center space-x-2">
          <span>{user.username}</span>
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </div>
        {/* ... other header elements ... */}
      </div>
    </header>
  );
}

// ... rest of the component code ...
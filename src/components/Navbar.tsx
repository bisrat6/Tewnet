import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Film, Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useEffect, useMemo, useState } from 'react';
import { debounce } from '@/utils/debounce';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  
  const isActive = (path: string) => location.pathname === path;

  const handleSearch = () => {
    if (searchQuery.trim()) {
      if (location.pathname === '/') {
        // If on home page, update search params and scroll
        setSearchParams({ q: searchQuery.trim() });
        // Scroll to search results
        setTimeout(() => {
          const searchSection = document.getElementById('search-results');
          if (searchSection) {
            searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        // If on other pages, navigate to home with search params
        navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      }
      setSearchQuery('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Debounced live search syncing to URL
  const debouncedUpdate = useMemo(
    () =>
      debounce((value: string) => {
        const trimmed = value.trim();
        if (!trimmed) return;
        if (location.pathname === '/') {
          setSearchParams({ q: trimmed });
        } else {
          navigate(`/?q=${encodeURIComponent(trimmed)}`);
        }
      }, 500),
    [location.pathname, navigate, setSearchParams]
  );

  useEffect(() => {
    if (searchQuery.length >= 2) {
      debouncedUpdate(searchQuery);
    }
  }, [searchQuery, debouncedUpdate]);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-2">
              <Film className="w-8 h-8 text-primary" />
              <span className="text-3xl font-bold">Tew.<span className='text-yellow-500'>net</span></span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  isActive('/') ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                Home
              </Link>
              <Link
                to="/search"
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  isActive('/search') ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                Search
              </Link>
              <Link
                to="/favorites"
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  isActive('/favorites') ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                Favorites
              </Link>
              <Link
                to="/profile"
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  isActive('/profile') ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                Profile
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <SearchIcon 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" 
                onClick={handleSearch}
              />
              <Input
                type="search"
                placeholder="Search movies..."
                className="w-64 pl-9 bg-muted/50 border-border/40"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Link to="/search">
              <SearchIcon className="lg:hidden w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

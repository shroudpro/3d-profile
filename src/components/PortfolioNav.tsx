import { FadeIn } from './Effects';

export function PortfolioNav({ worksPage = false, onContact }: { worksPage?: boolean; onContact: () => void }) {
  const home = worksPage ? '/' : '';
  return (
    <FadeIn delay={0} y={-20}>
      <nav className="hero-nav" aria-label="主导航">
        <a href={`${home}#about`}>关于我</a>
        <a href={`${home}#services`}>技术专长</a>
        <a href={`${home}#projects`}>精选作品</a>
        <a href="/works/" aria-current={worksPage ? 'page' : undefined}>所有作品</a>
        <button type="button" onClick={onContact} aria-haspopup="dialog">联系</button>
      </nav>
    </FadeIn>
  );
}

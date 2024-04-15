type SocialMedia =
  | 'imdb'
  | 'facebook'
  | 'instagram'
  | 'tiktok'
  | 'twitter'
  | 'vimeo'
  | 'youtube'
  | 'linkedin';

export default function useSocials(social: SocialMedia | string, link: string) {
  if (!link) return '';
  return link;
  // try {
  //   let tmplink = link.replace('https://', '');
  //   tmplink = tmplink.split('?')[0];
  //   switch (social) {
  //     case 'imdb':
  //       return tmplink.split('/name/')[1].split('/')[0];
  //     case 'facebook':
  //       tmplink = tmplink.split('/');
  //       return tmplink[tmplink.length - 1].replace('/', '');
  //     case 'instagram':
  //       tmplink = tmplink.split('/');
  //       return tmplink[tmplink.length - 1].replace('/', '');
  //     case 'twitter':
  //       tmplink = tmplink.split('/');
  //       return tmplink[tmplink.length - 1].replace('/', '');
  //     case 'tiktok':
  //       tmplink = tmplink.split('/');
  //       return tmplink[tmplink.length - 1].replace('/', '');
  //     case 'vimeo':
  //       return tmplink.split('/')[1];
  //     case 'youtube':
  //       if (tmplink.includes('/channel/')) return tmplink.split('/channel/')[1];
  //       else return tmplink.split('/')[1];
  //     case 'linkedin':
  //       return tmplink.split('/in/')[1].replace('/', '');
  //     default:
  //       return link;
  //   }
  // } catch (err) {
  //   return link;
  // }
}

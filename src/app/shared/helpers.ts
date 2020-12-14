export function makeId(): string {
    let text = '';
    const possible_combinations = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 11; i++ ) {
      text += possible_combinations.charAt(Math.floor(Math.random() * possible_combinations.length));
    }
    return text;
  }
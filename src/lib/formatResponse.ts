export type Task = {
  task_id: string;
  hook_url: string;
  monitored_nano_address: string;
  known_nano_addresses: string[];
}

type FormattedResponse = {
  monitored_nano_addresses?: string[];
} & {
  [key: string]: {
    known_nano_addresses: {
      [key: string]: {
        task_ids: string[];
        hook_urls: string[];
      }
    }
  }
}

export const reformatResponse = (response: Task[]) => {
  const result: FormattedResponse = {};

  response.forEach(item => {
    const {
      task_id,
      hook_url,
      monitored_nano_address,
      known_nano_addresses
    } = item;

    if (!result[monitored_nano_address]) {
      result[monitored_nano_address] = {
        known_nano_addresses: {}
      };
    }

    known_nano_addresses.forEach(knownAddress => {
      if (!result[monitored_nano_address].known_nano_addresses[knownAddress]) {
        result[monitored_nano_address].known_nano_addresses[knownAddress] = {
          task_ids: [],
          hook_urls: []
        };
      }

      result[monitored_nano_address].known_nano_addresses[knownAddress].task_ids.push(task_id);
      result[monitored_nano_address].known_nano_addresses[knownAddress].hook_urls.push(hook_url);
    });
  });

  return {
    monitored_nano_address_list: Object.keys(result),
    addresses: result
  };
  
}

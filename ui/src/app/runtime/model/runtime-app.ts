import { RuntimeAppInstance } from './runtime-app-instance';
import { Page } from '../../shared/model';

/**
 * Runtime application model that corresponds to AppStatusResource from SCDF server.
 *
 * @author Ilayaperumal Gopinathan
 */
export class RuntimeApp {

  public deploymentId: string;
  public state: string;
  public instances: any;
  public appInstances: RuntimeAppInstance[];

  constructor(deploymentId: string,
              state: string,
              instances: any,
              appInstances: RuntimeAppInstance[]) {
    this.deploymentId = deploymentId;
    this.state = state;
    this.instances = instances;
    this.appInstances = appInstances;
  }

  public static pageFromJSON(input): Page<RuntimeApp> {
    const page = Page.fromJSON<RuntimeApp>(input);
    if (input && input._embedded && input._embedded.appStatusResourceList) {
      page.items = (input._embedded.appStatusResourceList as RuntimeApp[]).map((item) => {
        if (!!item.instances._embedded && !!item.instances._embedded.appInstanceStatusResourceList) {
          item.appInstances = item.instances._embedded.appInstanceStatusResourceList;
        } else {
          item.appInstances = [];
        }
        return item;
      });
    }
    return page;
  }
}

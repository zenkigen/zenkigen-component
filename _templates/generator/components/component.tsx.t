---
to: src/components/<%= h.changeCase.pascal(component_name) %>/<%= h.changeCase.pascal(component_name) %>.tsx
---
import styles from './<%= h.changeCase.pascal(component_name) %>.module.css'

type Props = {

}

export const <%= h.changeCase.pascal(component_name) %> = ({}: Props) => {
  return (
    <div className={styles.wrapper}></div>
  )
}
